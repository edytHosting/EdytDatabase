#!/bin/bash

# Variabelen (pas deze aan)
SERVER="10.0.1.102"
USER="pi"
PASSWORD="pi"
COMMAND1="source catt_env/bin/activate"
COMMAND2="./cast_website.sh"

# Voer SSH-opdrachten uit
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no "$USER@$SERVER" <<EOF
$COMMAND1
$COMMAND2
EOF

# Verbinding wordt automatisch gesloten na uitvoering
echo "Opdrachten uitgevoerd en verbinding gesloten."
