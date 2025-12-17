from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "tasks-service"
    DATABASE_URL: str

    # ADD ALL ENV VARIABLES HERE
    email_user: str
    email_pass: str
    smtp_host: str
    smtp_port: int
    smtp_user: str
    smtp_pass: str
    smtp_from: str
    score_threshold: float
    admin_username: str
    admin_password: str
    openai_api_key: str

    class Config:
        env_file = ".env"
        extra = "ignore"  # optional but safe

settings = Settings()
