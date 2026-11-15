#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

W=956
H=2071
R=46

make_frame () {
  local src="$1" out="$2" title="$3" subtitle="$4"

  # Rounded-corner phone screenshot
  magick "$src" -resize ${W}x${H}\! \
    \( -size ${W}x${H} xc:black -fill white -draw "roundrectangle 0,0,$((W-1)),$((H-1)),$R,$R" \) \
    -alpha off -compose CopyOpacity -composite /tmp/phone.png

  # Phone + soft shadow merged
  magick /tmp/phone.png \( +clone -background black -shadow 55x28+0+22 \) +swap \
    -background none -layers merge +repage /tmp/phone_sh.png

  # Compose final App Store frame
  magick -size 1290x2796 gradient:#3f8b72-#27604c \
    \( -size 1090x -background none -fill white -font DejaVu-Sans-Bold -pointsize 77 -gravity center caption:"$title" \) \
      -gravity North -geometry +0+146 -composite \
    \( -size 1050x -background none -fill "#dcebe4" -font DejaVu-Sans -pointsize 38 -gravity center caption:"$subtitle" \) \
      -gravity North -geometry +0+416 -composite \
    /tmp/phone_sh.png -gravity North -geometry +0+624 -composite \
    -alpha remove -alpha off -quality 92 "$out"

  identify "$out"
}

make_frame vaani-01-home.jpg    appstore-1-home.jpg \
  "Never walk into the doctor unprepared" \
  "Vaani builds your question checklist so you leave with answers, not regrets."

make_frame vaani-02-questions.jpg appstore-2-questions.jpg \
  "Expert questions for your condition" \
  "Diabetes, kidney disease, cancer, heart, mental health and more."

make_frame vaani-03-hindi.jpg     appstore-3-language.jpg \
  "Your health, in your language" \
  "Available in 18+ languages, so nothing gets lost in translation."
