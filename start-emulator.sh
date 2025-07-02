#!/bin/bash
# Starts the Android emulator named Medium_Phone_API_36.0 in the background
~/Library/Android/sdk/emulator/emulator -avd Medium_Phone_API_36.0 -no-snapshot-save &
echo "Emulator 'Medium_Phone_API_36.0' is starting in the background." 