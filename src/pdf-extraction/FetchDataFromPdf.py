from fastapi import FastAPI, File, UploadFile, HTTPException
from openai import OpenAI
from pdf2image import convert_from_path
import pytesseract
import os
import json

# Set the path to the Tesseract executable (if not in PATH)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Set the path to the Poppler bin folder
poppler_path = r"C:\Users\Gaurav Chaudhari\Downloads\poppler-24.08.0\Library\bin"

# OpenAI API configuration
token = ""  # Replace with your actual token
endpoint = "https://models.inference.ai.azure.com"
model_name = "gpt-4o"

# Initialize OpenAI client
client = OpenAI(
    base_url=endpoint,
    api_key=token,
)

# Initialize FastAPI app
app = FastAPI()

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extracts text from a PDF file using Tesseract OCR."""
    images = convert_from_path(pdf_path, poppler_path=poppler_path)
    full_text = ""
    for image in images:
        text = pytesseract.image_to_string(image)
        full_text += text + "\n"
    return full_text

def ask_openai(context: str) -> dict:
    """Uses OpenAI GPT to extract structured data in JSON format."""
    response = client.chat.completions.create(
        model=model_name,
        messages=[
            {
                "role": "system",
                "content": "Extract structured data and return it as a JSON object. Include fields: Name, Arrival Date, Departure Date, Email, Origin, Destination, Passport Number.",
            },
            {
                "role": "user",
                "content": context,
            },
        ],
        response_format={"type": "json_object"},  # Request JSON response
    )
    # Parse the response as JSON
    try:
        return json.loads(response.choices[0].message.content)
    except json.JSONDecodeError:
        raise ValueError("Failed to parse OpenAI response as JSON")

@app.post("/extract")
async def extract_data(file: UploadFile = File(...)):
    """API endpoint to extract structured data from a PDF file."""
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    # Log the incoming file details
    print(f"Received file: {file.filename}, size: {file.size} bytes")
    
    # Save the uploaded file temporarily
    pdf_path = "temp.pdf"
    with open(pdf_path, "wb") as buffer:
        buffer.write(file.file.read())
    
    try:
        # Extract text from the PDF
        extracted_text = extract_text_from_pdf(pdf_path)
        
        if extracted_text:
            # Ask OpenAI to extract structured data in JSON format
            structured_data = ask_openai(extracted_text)
            return structured_data  # Return the JSON response
        else:
            raise HTTPException(status_code=500, detail="Failed to extract text from the PDF")
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up the temporary file
        if os.path.exists(pdf_path):
            os.remove(pdf_path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)