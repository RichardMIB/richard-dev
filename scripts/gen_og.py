#!/usr/bin/env python3
"""Generate richard.dev OG image (1200x630) matching the site design system."""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (5, 7, 10)          # --ds-color-neutral-950 #05070a
ACCENT = (34, 211, 238)  # --ds-color-brand-400 #22d3ee
FG = (230, 237, 243)     # --ds-color-neutral-100
MUTED = (169, 182, 195)  # --ds-color-neutral-300
BORDER = (36, 49, 64)    # --ds-color-neutral-700
SURFACE = (16, 22, 29)   # --ds-color-neutral-850

F = "/home/paperclip/adventure-products/.fonts/JetBrainsMono-"
f_bold = ImageFont.truetype(F + "Bold.ttf", 96)
f_bold_sm = ImageFont.truetype(F + "Bold.ttf", 40)
f_reg = ImageFont.truetype(F + "Regular.ttf", 34)
f_reg_sm = ImageFont.truetype(F + "Regular.ttf", 26)
f_reg_xs = ImageFont.truetype(F + "Regular.ttf", 22)

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

# subtle cyan glow top-right (matches --ds-glow-cyan)
glow = Image.new("L", (W, H), 0)
gd = ImageDraw.Draw(glow)
for r in range(420, 0, -4):
    a = int(26 * (1 - r / 420))
    gd.ellipse([W - 120 - r, -120 - r, W - 120 + r, -120 + r], fill=a)
img.paste(Image.new("RGB", (W, H), ACCENT), (0, 0), glow)

# faint dot grid
for x in range(40, W, 48):
    for y in range(40, H, 48):
        d.ellipse([x, y, x + 2, y + 2], fill=(20, 26, 34))

# terminal card
pad = 60
card = [pad, pad, W - pad, H - pad]
d.rounded_rectangle(card, radius=18, outline=BORDER, width=2, fill=SURFACE)

# top bar with dots
for i, c in enumerate([(244, 63, 94), (251, 191, 36), (52, 211, 153)]):
    d.ellipse([pad + 28 + i * 34, pad + 28, pad + 28 + i * 34 + 14, pad + 28 + 14], fill=c)
d.text((pad + 28 + 3 * 34 + 20, pad + 24), "richard.dev", font=f_reg_xs, fill=MUTED)

# status line
d.text((pad + 28, pad + 90), "> status: disponível para estágio", font=f_reg_sm, fill=ACCENT)

# name with caret
d.text((pad + 28, pad + 150), "Richard", font=f_bold, fill=FG)
d.text((pad + 28 + d.textlength("Richard", font=f_bold), pad + 150), "_", font=f_bold, fill=ACCENT)

# role
d.text((pad + 28, pad + 280), "Desenvolvedor Full Stack", font=f_bold_sm, fill=FG)

# tagline
d.text((pad + 28, pad + 350), "Backend, automação e inteligência artificial.", font=f_reg, fill=MUTED)
d.text((pad + 28, pad + 400), "Construo sistemas que funcionam de verdade.", font=f_reg, fill=MUTED)

# divider
d.line([pad + 28, pad + 470, W - pad - 28, pad + 470], fill=BORDER, width=2)

# footer meta
d.text((pad + 28, pad + 500), "loc: Fortaleza-CE", font=f_reg_xs, fill=MUTED)
d.text((pad + 28, pad + 540), "stack: TS · React · Node · SQL", font=f_reg_xs, fill=MUTED)

img.save("/home/paperclip/adventure-products/richard-work/public/og-image.png")
print("saved", img.size, img.mode)
