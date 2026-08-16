#!/usr/bin/env bash
# Launcher script to run the app with the workspace venv Python if available
export PORT="${PORT:-8001}"

if [ -x "./venv/bin/python" ]; then
	./venv/bin/python main.py
else
	python3 main.py
fi
