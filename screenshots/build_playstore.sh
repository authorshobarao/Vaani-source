#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p play

# 1) App icon 512x512 PNG
magick ../artifacts/vaani-mobile/assets/images/icon.png -resize 512x512 play/play-icon-512.png

# 2) Feature graphic 1024x500
magick -size 1024x500 gradient:#3f8b72-#27604c \
  \( ../artifacts/vaani-mobile/assets/images/icon.png -resize 220x220 \
     \( -size 220x220 xc:black -fill white -draw "roundrectangle 0,0,219,219,48,48" \) \
     -alpha off -compose CopyOpacity -composite \) \
  -gravity West -geometry +70+0 -compose over -composite \
  \( -size 620x -background none -fill white -font DejaVu-Sans-Bold -pointsize 64 -gravity West caption:"Vaani" \) \
  -gravity West -geometry +340+-70 -composite \
  \( -size 620x -background none -fill "#dcebe4" -font DejaVu-Sans -pointsize 30 -gravity West caption:"Find your voice at the doctor's office. Question checklists in 18+ languages." \) \
  -gravity West -geometry +340+30 -composite \
  -alpha remove -alpha off play/play-feature-1024x500.png

identify play/play-icon-512.png play/play-feature-1024x500.png

# 3) Phone screenshots 1080x1920 (9:16)
W=690
H=1494
R=34

make_frame () {
  local src="$1" out="$2" title="$3" subtitle="$4"

  magick "$src" -resize ${W}x${H}\! \
    \( -size ${W}x${H} xc:black -fill white -draw "roundrectangle 0,0,$((W-1)),$((H-1)),$R,$R" \) \
    -alpha off -compose CopyOpacity -composite /tmp/phone.png

  magick /tmp/phone.png \( +clone -background black -shadow 55x20+0+16 \) +swap \
    -background none -layers merge +repage /tmp/phone_sh.png

  magick -size 1080x1920 gradient:#3f8b72-#27604c \
    \( -size 920x -background none -fill white -font DejaVu-Sans-Bold -pointsize 56 -gravity center caption:"$title" \) \
      -gravity North -geometry +0+90 -composite \
    \( -size 880x -background none -fill "#dcebe4" -font DejaVu-Sans -pointsize 28 -gravity center caption:"$subtitle" \) \
      -gravity North -geometry +0+280 -composite \
    /tmp/phone_sh.png -gravity North -geometry +0+380 -composite \
    -alpha remove -alpha off -quality 92 "$out"

  identify "$out"
}

make_frame vaani-01-home.jpg    play/play-1-home.jpg \
  "Never walk into the doctor unprepared" \
  "Vaani builds your question checklist so you leave with answers, not regrets."

make_frame vaani-02-questions.jpg play/play-2-questions.jpg \
  "Expert questions for your condition" \
  "Diabetes, kidney disease, cancer, heart, mental health and more."

make_frame vaani-03-hindi.jpg     play/play-3-language.jpg \
  "Your health, in your language" \
  "Available in 18+ languages, so nothing gets lost in translation."
