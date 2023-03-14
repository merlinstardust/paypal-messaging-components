#!/bin/bash

lastTag=$(git tag | tail -1)

read -p "Do you wish to roll back to the previous release of $lastTag? (Y or y)" -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]];
then
  git checkout release
  git reset --hard $lastTag

  echo "Local release branch rolled back"
  read -p "Are you certain you wish to revert to the release of $lastTag? (Y or y)" -n 1 -r secondConfirm

  if [[ $REPLY =~ ^[Yy]$ ]];
  then
    # git push -f https://github.com/paypal/paypal-messaging-components.git
  else
    echo "Skipping force push"
  fi
else
  echo "Skipping reversion"
fi
