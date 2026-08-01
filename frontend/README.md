# VectorShift Frontend Assessment

This project contains the React pipeline builder for the VectorShift frontend assessment.

## Run the Frontend

From this directory:

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Run the Backend

From `../backend`:

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

The frontend submit button posts the current React Flow nodes and edges to
`http://localhost:8000/pipelines/parse` and displays the returned node count, edge
count, and DAG status.

## Build

```bash
npm run build
```

Create React App may print a stale Browserslist database notice. The production
build still completes successfully.
