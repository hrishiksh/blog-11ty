---
title: Install Jellyfin on PopOS, mint, and other Ubuntu derivatives
description: Installing Jellyfin on Ubuntu-based distributions like PopOS and Linux Mint is more complex. Change the DISTRO variable to make it work.
date: 2023-07-01
related:
    - get-frame-rate-video-ffmpeg
    - ffmpeg-transcoding-h265-hevc-vp9-av1
    - generate-image-from-html-satori
---

If you are landing on this blog, you may know [what Jellyfin is](https://jellyfin.org/). But to level the ground for both of us, this is a quick recap for you.

## What is Jellyfin

Jellyfin is a media server, that gives you a nice-looking UI to access the media stored in your hard disk.

Unlike its competitors like [Plex](https://www.plex.tv/) and [Emby](https://emby.media/), Jellyfin is open source and free to use.


>Jellyfin is a fork of Emby. I personally like Emby due to its stability. Sometimes you have to tweak things in Jellyfin but Emby just works.

## Install Jellyfin in PopOS, Linux Mint, or Ubuntu-based derivatives

Before following the process, make sure you have root access to the system.

### Step1: Install required dependencies

```bash
sudo apt update
sudo apt install curl gnupg
```

### Step2: Add the required keyrings

```bash
sudo mkdir /etc/apt/keyrings
DISTRO="ubuntu"
CODENAME="$( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release )"
curl -fsSL https://repo.jellyfin.org/${DISTRO}/jellyfin_team.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/jellyfin.gpg
```

### Step3: Write Jellyfin source file

```bash
cat <<EOF | sudo tee /etc/apt/sources.list.d/jellyfin.sources
Types: deb
URIs: https://repo.jellyfin.org/${DISTRO}
Suites: ${CODENAME}
Components: main
Architectures: $( dpkg --print-architecture )
Signed-By: /etc/apt/keyrings/jellyfin.gpg
EOF
```

### Step4: Install Jellyfin

```bash
sudo apt update
sudo apt install jellyfin
```

## An alternative method to install Jellyfin in Linux distributions

Jellyfin has a community-maintained Flatpak version. You can install Flatpak in any Linux distribution. You have enabled Flatpak and Flathub, [visit this URL for a step-by-step guide](https://flatpak.org/setup/).

After Flatpak is set up on your system, open your terminal and run the following command to install Jellyfin using Flatpak.

```bash
flatpak install flathub org.jellyfin.JellyfinServer
```

After installation run this program. Your server starts in the background and launches the web client after 10 seconds.