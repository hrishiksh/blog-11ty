---
title: How to get the frame rate of a video using ffmpeg
description: Getting the frame rate of a video is very important in encoding and transcoding a video. This is the easiest and straightforward way to get the same.
date: 2023-07-01
related:
    - ffmpeg-transcoding-h265-hevc-vp9-av1
    - convert-svg-png-browser
    - install-jellyfin-popos-mint
---

In this blog, I will discuss 3 ways to get the frame rate of a video. As a prerequisite, you need to have `ffmpeg` installed on your device.

## Get video frame rate using ffprobe

The `ffprobe` module comes together with the `ffmpeg` package. Therefore you don’t need to install it exclusively.

```bash
ffprobe -v 0 -of compact=p=0 -select_streams 0 -show_entries stream=r_frame_rate "video.mkv"
```

The output from the above command should look like this.

```bash
r_frame_rate=25/1
```

This means that the frame rate of `video.mkv` file is 25. 

## Get video frame rate using ffmpeg

You can use `ffmpeg` to get the video frame rate. Here I pipe the `ffmpeg` output to `sed` command to filter out the frame rate.

```bash
ffmpeg -i "video.mkv" 2>&1 | sed -n "s/.*, \(.*\) tbr.*/\1/p"
```

The output of the above command looks like this.

```bash
25
```

## Get video frame rate using Nautilus

This is a graphical way to get the frame rate of a video. Nautilus is the default file manager in gnome desktops. If you are not using Gnome, you can also install it using your package manager.

In the Nautilus file manager, right-click on the video and select `properties` option. Then open the `Audio/Video` tab. There you get the frame rate of the video.

![showing frame rate of a video using nautilus file manager](/inline-images/ffmpeg-frame-rate-nautilus.webp)

showing frame rate of a video using nautilus file manager