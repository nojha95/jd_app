# Environment Variables Setup

This application has been updated to use environment variables for sensitive configuration data instead of hardcoded values.

## Changes Made

1. **Replaced hardcoded secret key** in `backend/app.py` with environment variable `SECRET_KEY`
2. **Replaced hardcoded login credentials** with environment variables `VALID_USERNAME` and `VALID_PASSWORD`
3. **Replaced hardcoded Perplexity API key** with environment variable `PERPLEXITY_API_KEY`
4. **Enabled OpenAI API configuration** through environment variables `OPENAI_ORGANIZATION` and `OPENAI_API_KEY`
5. **Added python-dotenv** dependency for loading environment variables

## Setup Instructions

### Backend Setup

1. Copy the example environment file:
   ```bash
   cp .env.example backend/.env
   ```

2. Edit `backend/.env` and replace the placeholder values with your actual credentials:
   ```env
   SECRET_KEY=your_actual_secret_key_here
   OPENAI_ORGANIZATION=your_openai_organization_here
   OPENAI_API_KEY=your_openai_api_key_here
   PERPLEXITY_API_KEY=your_perplexity_api_key_here
   VALID_USERNAME=your_desired_username
   VALID_PASSWORD=your_secure_password
   ```

3. Install dependencies:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

### Frontend Setup

```bash
cd frontend
npm install
```

## Security Notes

- The `.env` file is now properly excluded from version control via `.gitignore`
- Default fallback values are provided for development, but should be changed for production
- Generate a secure secret key for production using: `python -c "import secrets; print(secrets.token_hex(32))"`

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `SECRET_KEY` | Flask/Quart secret key for session management | Yes |
| `OPENAI_ORGANIZATION` | OpenAI organization ID | Yes (for CV matching) |
| `OPENAI_API_KEY` | OpenAI API key | Yes (for CV matching) |
| `PERPLEXITY_API_KEY` | Perplexity API key | Yes (for AI search) |
| `VALID_USERNAME` | Login username | Optional (defaults to 'admin') |
| `VALID_PASSWORD` | Login password | Optional (defaults to 'admin') |