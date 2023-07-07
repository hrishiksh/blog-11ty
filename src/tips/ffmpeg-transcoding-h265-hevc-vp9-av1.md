---
title: FFmpeg command for transcoding video into h265, hevc, vp9 and av1
description: FFmpeg is used to transcode and compress video files. This article contain FFmpeg command to transcode video into h265, hevc, vp9 and av1 format.
date: 2023-07-01
related:
    - get-frame-rate-video-ffmpeg
    - generate-image-from-html-satori
    - install-jellyfin-popos-mint
---

FFmpeg is a very powerful tool for video-related tasks. It supports almost all video codecs that exist. The power of FFmpeg lies in its CLI and the different parameters you set to get the desired output.

In this article, I am listing some very popular FFmpeg transcoding commands which take a video input and convert it into h265, HEVC, vp9, and av1 format.

> In most of the `ffmpeg` commands, you will find a `crf` property. You can tweak this value to get a better size-to-quality ratio. Lower `crf` means better quality.

## Supported profiles by FFmpeg

Working of FFmpeg in your device depends on many factors including hardware support and installed driver versions. To check what profiles are supported in your device, run the following.

```bash
vainfo
```

The output of the above command in my machine looks like this. Your output may vary.

```bash
vainfo: Supported profile and entrypoints
      VAProfileMPEG2Simple            :	VAEntrypointVLD
      VAProfileMPEG2Main              :	VAEntrypointVLD
      VAProfileVC1Simple              :	VAEntrypointVLD
      VAProfileVC1Main                :	VAEntrypointVLD
      VAProfileVC1Advanced            :	VAEntrypointVLD
      VAProfileH264ConstrainedBaseline:	VAEntrypointVLD
      VAProfileH264ConstrainedBaseline:	VAEntrypointEncSlice
      VAProfileH264Main               :	VAEntrypointVLD
      VAProfileH264Main               :	VAEntrypointEncSlice
      VAProfileH264High               :	VAEntrypointVLD
      VAProfileH264High               :	VAEntrypointEncSlice
      VAProfileHEVCMain               :	VAEntrypointVLD
      VAProfileHEVCMain               :	VAEntrypointEncSlice
      VAProfileHEVCMain10             :	VAEntrypointVLD
      VAProfileHEVCMain10             :	VAEntrypointEncSlice
      VAProfileJPEGBaseline           :	VAEntrypointVLD
      VAProfileVP9Profile0            :	VAEntrypointVLD
      VAProfileVP9Profile2            :	VAEntrypointVLD
      VAProfileNone                   :	VAEntrypointVideoProc
```

According to `vainfo` command, I can encode and decode for both `h264` and `HEVC` codecs.

## Software Encoding into h265 video codec

We all know that `h265` has a lower bitrate for the same quality video than `h264`. It means your video files get smaller in size for the same video quality if you transcode your video file into `h265` format.

Software encoding is slow but it produces better compression and better-quality output. If you have time and want better-quality encoding, you should use software encoding.

```bash
ffmpeg -i input -c:v libx265 -crf 26 -preset fast -c:a aac -b:a 128k output.mp4
```

## Hardware accelerated encoding into HEVC codec

If you have a good quality GPU that supports `HEVC` video encoding, then you can use this feature. This method takes less time but produces a larger file as compared to software encoding. Sometimes hardware accelerated encoding reduces the video quality.

To find what `vaapi_devices` are installed in your computer, run the following command.

```bash
ls /dev/dri
```

Now add the driver path in the `-vaapi_devices` argument in your `ffmpeg` command to start the encoding process.

```bash
ffmpeg -vaapi_device /dev/dri/renderD128 -i input -vf 'format=nv12,hwupload' -c:v hevc_vaapi -profile:v main -rc_mode CQP -global_quality 25 output.mp4
```

## VP9 compression using FFmpeg

`VP9` compression is at par with `h265` and has a wide range of hardware support. `Vp9` format is open-sourced and used by large organizations.

To get better compression using `VP9` encoding, a two-pass process is used.

```bash
ffmpeg -i input.mkv -b:v 0 -tile-columns 2 -g 240 -threads 8 -quality good -crf 31 -c:v libvpx-vp9 -pass 1 -an -f null /dev/null && \
ffmpeg -i input.mkv -b:v 0 -tile-columns 3 -g 240 -threads 8 -quality good -crf 31 -c:v libvpx-vp9 -c:a libopus -pass 2 -speed 4 -y output.webm
```

Follow this [Google developer guide](https://developers.google.com/media/vp9/settings/vod) for a better understanding.

## FFmpeg AV1 encoding with libaom-av1

`AV1` is a superior compression algorithm than `vp9` (i.e. 30% better) and `h265`. But `av1` software encoding is very slow. You should have a dedicated graphics card that supports `av1` hardware encoding. Otherwise, the process is too slow and there is no benefit of using it.

To check if `libaom` module is present in your `ffmpeg` installation, run `ffmpeg -h encoder=libaom-av1`.

```bash
ffmpeg -i input.mp4 -c:v libaom-av1 -crf 30 av1_test.mkv
```

## Conclusion

FFmpeg is a versatile tool for video compression and transcoding process. If you need more control over the process, you have to dig deep into [FFmpeg documentation](https://ffmpeg.org/ffmpeg.html). In addition to this, if you want to get the framerate of a video, [read this article](https://hrishikeshpathak.com/tips/get-frame-rate-video-ffmpeg/). Happy coding.