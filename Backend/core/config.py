from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App
    PROJECT_NAME: str = "hrms-backend"

    # Database
    DATABASE_URL: str

    # SMTP / Email
    SMTP_HOST: str
    SMTP_PORT: int
    SMTP_USERNAME: str
    SMTP_PASSWORD: str
    SMTP_FROM: str

    # Admin
    ADMIN_USERNAME: str
    ADMIN_PASSWORD: str

    # Business
    SCORE_THRESHOLD: float

    # OpenAI
    OPENAI_API_KEY: str

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
