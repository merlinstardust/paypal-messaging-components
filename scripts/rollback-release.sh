#!/bin/bash

# upstreamUrl="https://github.com/paypal/paypal-messaging-components.git"

# git fetch --tags $upstreamUrl

function getVersions() {
  git tag | xargs -I@ git log --format=format:"%ai @%n" -1 @ | sort | awk '{print $4}'
}

# versions=$(git tag | xargs -I@ git log --format=format:"%ai @%n" -1 @ | sort | awk '{print $4}')
latestVersion="$(getVersions | tail -1)"
previousVersion=$(getVersions | tail -2 | head -1)

echo $latestVersion
echo "-----"
echo $previousVersion
echo "-----"

read -p "Do you wish to roll back from $latestVersion to $previousVersion? (Y or y) " -n 1 -r
echo ""
echo ""

if [[ $REPLY =~ ^[Yy]$ ]];
then
  # git checkout release
  # git reset --hard $lastTag

  echo "Local release branch rolled back"
  read -p "Are you certain you wish to revert $latestVersion to $previousVersion? (Y or y) " -n 1 -r secondConfirm
  echo ""
  echo ""

  if [[ $secondConfirm =~ ^[Yy]$ ]];
  then
    echo "Force pushing $previousVersion to overwrite $latestVersion"
    # git push -f $upstreamUrl
  else
    echo "Skipping force push"
  fi
else
  echo "Skipping reversion"
fi
