# app/routers/pipelines.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from schema.pipeline import PipelineCreate,PipelineResponse
import model
from core.database import get_db
import crud_ops

router = APIRouter()

# Dependency: use get_db imported from core.database (do not redefine it here)


@router.post("/", response_model=PipelineResponse)
def create_pipeline(pipeline: PipelineCreate, db: Session = Depends(get_db)):
    db_pipeline = crud_ops.create_pipeline(db=db, pipeline=pipeline)
    return db_pipeline


@router.get("/", response_model=List[PipelineResponse])
def read_pipelines(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_ops.get_pipelines(db, skip=skip, limit=limit)


@router.delete("/{pipeline_id}")
def delete_pipeline(pipeline_id: int, db: Session = Depends(get_db)):
    success = crud_ops.delete_pipeline(db, pipeline_id)
    if not success:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    return {"ok": True}
