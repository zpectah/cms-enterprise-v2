<ul class="ui-list">
    @if($public['social_url_facebook'])
        <li class="ui-list-item">
            <a
                    href="{{$public['social_url_facebook']}}"
                    target="_blank"
                    class="ui-list-link"
            >
                <img
                        src="/assets/social/facebook.svg"
                        alt="Facebook"
                        style="max-width: 28px;height: auto;"
                />
            </a>
        </li>
    @endif
    @if($public['social_url_twitter'])
        <li class="ui-list-item">
            <a
                    href="{{$public['social_url_twitter']}}"
                    target="_blank"
                    class="ui-list-link"
            >
                <img
                        src="/assets/social/twitter.svg"
                        alt="Twitter"
                        style="max-width: 28px;height: auto;"
                />
            </a>
        </li>
    @endif
    @if($public['social_url_linkedin'])
        <li class="ui-list-item">
            <a
                    href="{{$public['social_url_linkedin']}}"
                    target="_blank"
                    class="ui-list-link"
            >
                <img
                        src="/assets/social/linkedin.svg"
                        alt="LinkedIn"
                        style="max-width: 28px;height: auto;"
                />
            </a>
        </li>
    @endif
    @if($public['social_url_youtube'])
        <li class="ui-list-item">
            <a
                    href="{{$public['social_url_youtube']}}"
                    target="_blank"
                    class="ui-list-link"
            >
                <img
                        src="/assets/social/youtube.svg"
                        alt="YouTube"
                        style="max-width: 28px;height: auto;"
                />
            </a>
        </li>
    @endif
    @if($public['social_url_twitch'])
        <li class="ui-list-item">
            <a
                    href="{{$public['social_url_twitch']}}"
                    target="_blank"
                    class="ui-list-link"
            >
                <img
                        src="/assets/social/twitch.svg"
                        alt="Twitch"
                        style="max-width: 28px;height: auto;"
                />
            </a>
        </li>
    @endif
    @if($public['social_url_github'])
        <li class="ui-list-item">
            <a
                    href="{{$public['social_url_github']}}"
                    target="_blank"
                    class="ui-list-link"
            >
                <img
                        src="/assets/social/github.svg"
                        alt="GitHub"
                        style="max-width: 28px;height: auto;"
                />
            </a>
        </li>
    @endif
</ul>