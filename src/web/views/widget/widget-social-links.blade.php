<div
    class="widget widget-social-links"
>
    <div
        class="widget-main"
    >
        <div
            class="hstack gap-2"
        >
            @if($public['social_url_facebook'])
                <a
                    href="{{$public['social_url_facebook']}}"
                    target="_blank"
                >
                    <img
                        src="/assets/social/facebook.svg"
                        alt="Facebook"
                        style="max-width: 28px;height: auto;"
                    />
                </a>
            @endif
            @if($public['social_url_twitter'])
                <a
                    href="{{$public['social_url_twitter']}}"
                    target="_blank"
                >
                    <img
                        src="/assets/social/twitter.svg"
                        alt="Twitter"
                        style="max-width: 28px;height: auto;"
                    />
                </a>
            @endif
            @if($public['social_url_linkedin'])
                <a
                    href="{{$public['social_url_linkedin']}}"
                    target="_blank"
                >
                    <img
                        src="/assets/social/linkedin.svg"
                        alt="LinkedIn"
                        style="max-width: 28px;height: auto;"
                    />
                </a>
            @endif
            @if($public['social_url_youtube'])
                <a
                    href="{{$public['social_url_youtube']}}"
                    target="_blank"
                >
                    <img
                        src="/assets/social/youtube.svg"
                        alt="YouTube"
                        style="max-width: 28px;height: auto;"
                    />
                </a>
            @endif
            @if($public['social_url_twitch'])
                <a
                    href="{{$public['social_url_twitch']}}"
                    target="_blank"
                >
                    <img
                        src="/assets/social/twitch.svg"
                        alt="Twitch"
                        style="max-width: 28px;height: auto;"
                    />
                </a>
            @endif
            @if($public['social_url_github'])
                <a
                    href="{{$public['social_url_github']}}"
                    target="_blank"
                >
                    <img
                        src="/assets/social/github.svg"
                        alt="GitHub"
                        style="max-width: 28px;height: auto;"
                    />
                </a>
            @endif
        </div>
    </div>
</div>