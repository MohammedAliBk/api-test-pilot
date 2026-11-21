# ==============================
# 📁 Navigation & Files
# ==============================

alias ll='ls -lah'
alias la='ls -A'
alias l='ls -CF'
alias lt='ls -lah --sort=time'
alias lsize='ls -lahS'

alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias .....='cd ../../../..'

alias c='clear'
alias h='history'
alias q='exit'


# ==============================
# 🔀 Git
# ==============================

alias g='git'
alias gs='git status'
alias ga='git add'
alias gaa='git add --all'
alias gc='git commit'
alias gcm='git commit -m'
alias gp='git push'
alias gpl='git pull'
alias gf='git fetch'
alias gd='git diff'
alias gds='git diff --staged'
alias gl='git log --oneline --graph --decorate'
alias glo='git log --oneline'
alias gb='git branch'
alias gba='git branch -a'
alias gco='git checkout'
alias gsw='git switch'
alias gnew='git switch -c'
alias gm='git merge'
alias gr='git restore'
alias grs='git restore --staged'
alias gst='git stash'
alias gstp='git stash pop'

# Git shortcuts
alias gac='git add -A && git commit'
alias gap='git add -A && git commit -m'
alias gcp='git add -A && git commit -m && git push'


# ==============================
# 🐳 Docker
# ==============================

alias d='docker'
alias di='docker images'
alias dps='docker ps'
alias dpsa='docker ps -a'
alias dstart='docker start'
alias dstop='docker stop'
alias drestart='docker restart'
alias drm='docker rm'
alias drmi='docker rmi'
alias dex='docker exec -it'
alias dlogs='docker logs'
alias dlogsf='docker logs -f'
alias dinspect='docker inspect'

# Docker cleanup
alias dprune='docker system prune'
alias dprunea='docker system prune -a'

# Docker Compose
alias dc='docker compose'
alias dcu='docker compose up'
alias dcud='docker compose up -d'
alias dcd='docker compose down'
alias dcb='docker compose build'
alias dcl='docker compose logs'
alias dclf='docker compose logs -f'
alias dcr='docker compose restart'
alias dce='docker compose exec'


# ==============================
# ☁️ Terraform
# ==============================

alias tf='terraform'
alias tfi='terraform init'
alias tfp='terraform plan'
alias tfa='terraform apply'
alias tfd='terraform destroy'
alias tfv='terraform validate'
alias tff='terraform fmt'
alias tfs='terraform show'
alias tfo='terraform output'
alias tfr='terraform refresh'

# Terraform workflow
alias tfip='terraform init && terraform plan'
alias tfpa='terraform plan && terraform apply'


# ==============================
# 🔧 Jenkins
# ==============================

alias j='jenkins'
alias jl='journalctl -u jenkins'
alias jlf='journalctl -u jenkins -f'
alias js='sudo systemctl status jenkins'
alias jstart='sudo systemctl start jenkins'
alias jstop='sudo systemctl stop jenkins'
alias jr='sudo systemctl restart jenkins'
alias jen='sudo systemctl enable jenkins'
alias jdis='sudo systemctl disable jenkins'


# ==============================
# ⚙️ Systemd
# ==============================

alias sctl='sudo systemctl'
alias sst='sudo systemctl status'
alias ssr='sudo systemctl restart'
alias sstart='sudo systemctl start'
alias sstop='sudo systemctl stop'

alias jctl='journalctl'
alias jboot='journalctl -b'
alias jerr='journalctl -p 3 -xb'
alias jf='journalctl -f'


# ==============================
# 📦 Arch / Pacman
# ==============================

alias p='sudo pacman'
alias pi='sudo pacman -S'
alias pr='sudo pacman -Rns'
alias ps='pacman -Ss'
alias pq='pacman -Qs'
alias piq='pacman -Qi'
alias pql='pacman -Ql'
alias pu='sudo pacman -Syu'

# AUR (yay)
alias y='yay'
alias yi='yay -S'
alias yr='yay -Rns'
alias ys='yay -Ss'
alias yu='yay -Syu'


# ==============================
# 🌐 Networking
# ==============================

alias ipa='ip addr'
alias ipr='ip route'
alias ports='ss -tulpn'
alias listening='ss -lntup'

alias pingg='ping -c 5'
alias myip='curl ifconfig.me'
alias dns='resolvectl status'


# ==============================
# 🔐 SSH
# ==============================

alias sshk='ssh-keygen'
alias sshls='ls -la ~/.ssh'


# ==============================
# 📊 Processes
# ==============================

alias psx='ps aux'
alias psg='ps aux | grep -i'
alias top='btop'

alias mem='free -h'
alias disk='df -h'
alias du1='du -h --max-depth=1'


# ==============================
# 📜 Logs
# ==============================

alias logs='journalctl -f'
alias errors='journalctl -p err -b'
alias bootlog='journalctl -b'


# ==============================
# 🧹 Cleanup
# ==============================

alias cleanpac='sudo pacman -Sc'
alias cleanorphans='sudo pacman -Rns $(pacman -Qtdq)'


# ==============================
# 🧠 Useful
# ==============================

alias reload='source ~/.zshrc'
alias zshrc='nvim ~/.zshrc'
alias path='echo $PATH | tr ":" "\n"'

alias please='sudo'
alias cclip='xclip -selection clipboard'
