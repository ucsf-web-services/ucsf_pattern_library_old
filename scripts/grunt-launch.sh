#!/bin/bash
cd `dirname $0`
cd .. # in repo root
echo ""
echo "# Killing any stray Grunt processes..."
killall grunt
echo ""
echo "# Starting new Grunt process..."
grunt