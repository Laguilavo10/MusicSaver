#!/bin/bash
# Start the backend server using activated virtual environment and uvicorn server
source backend/env/Scripts/activate && cd backend && uvicorn main:app --reload

