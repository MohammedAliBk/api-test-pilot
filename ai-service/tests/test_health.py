from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_liveness():
    response = client.get("/health/live")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_readiness_is_defined():
    response = client.get("/health/ready")
    assert response.status_code in (200, 503)


def test_capabilities_matches_contract():
    response = client.get("/v1/capabilities")
    body = response.json()
    assert response.status_code == 200
    assert "1.0" in body["contractVersions"]
    assert body["features"]["strictGrounding"] is True
    assert body["limits"]["maxTestCasesPerOperation"] == 15
