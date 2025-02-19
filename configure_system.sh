#!/bin/bash

# Ensure the script is run as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit
fi

# Set the environment variable for glibc rseq support
export GLIBC_TUNABLES=glibc.pthread.rseq=0
echo "Set GLIBC_TUNABLES=glibc.pthread.rseq=0"

# Increase vm.max_map_count
sysctl -w vm.max_map_count=262144
echo "Increased vm.max_map_count to 262144"

# Set swappiness to 1
sysctl -w vm.swappiness=1
echo "Set swappiness to 1"

# Change the contents of the specified sysfs file
# Replace /path/to/sysfsFile with the actual path
echo 0 > /path/to/sysfsFile
echo "Set contents of sysfsFile to 0"

echo "System configuration changes applied. Please ensure you are using the XFS filesystem for the WiredTiger storage engine."
