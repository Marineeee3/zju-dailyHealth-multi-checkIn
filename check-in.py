import sys

username = sys.argv[1]
password = sys.argv[2]
try:
    print("The inputs are:", username, password)
except Exception:
    exit(1)
