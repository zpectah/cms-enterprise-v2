<div class="hstack gap-1 fs-5">
    @if($public['social_url_facebook'])
        <a
                href="{{$public['social_url_facebook']}}"
                target="_blank"
                class="ui-list-link"
        >
            <i class="icon bi-facebook"></i>
        </a>
    @endif
    @if($public['social_url_twitter'])
            <a
                    href="{{$public['social_url_twitter']}}"
                    target="_blank"
                    class="ui-list-link"
            >
                <i class="icon bi-twitter"></i>
            </a>
    @endif
    @if($public['social_url_linkedin'])
            <a
                    href="{{$public['social_url_linkedin']}}"
                    target="_blank"
                    class="ui-list-link"
            >
                <i class="icon bi-linkedin"></i>
            </a>
    @endif
    @if($public['social_url_youtube'])
            <a
                    href="{{$public['social_url_youtube']}}"
                    target="_blank"
                    class="ui-list-link"
            >
                <i class="icon bi-youtube"></i>
            </a>
    @endif
    @if($public['social_url_twitch'])
            <a
                    href="{{$public['social_url_twitch']}}"
                    target="_blank"
                    class="ui-list-link"
            >
                <i class="icon bi-twitch"></i>
            </a>
    @endif
    @if($public['social_url_github'])
            <a
                    href="{{$public['social_url_github']}}"
                    target="_blank"
                    class="ui-list-link"
            >
                <i class="icon bi-github"></i>
            </a>
    @endif
</div>
