#!/bin/sh
# 使い方: sh tests/run_all.sh   （playwright と chromium が 必要: pip install playwright && playwright install chromium）
cd "$(dirname "$0")/.." && python3 build.py --dev >/dev/null
python3 -m http.server 8766 >/dev/null 2>&1 & S=$!; sleep 1
fail=0
for t in tests/test_*.py; do printf '%s ... ' "$t"; if out=$(timeout 300 python3 "$t" 2>&1) && echo "$out" | tail -1 | grep -qE "^(errs )?\[\]$"; then echo ok; else echo NG; echo "$out" | tail -5; fail=1; fi; done
kill $S; exit $fail
