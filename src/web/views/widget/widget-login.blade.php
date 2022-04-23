@if($member['actions']['login'])
    <div class="widget login">
        <h4 class="title title--widget">
            @if(!$member['profile'])
                {{$t('widget:login.title')}}
            @else
                {{$t('widget:profile.title')}}
            @endif
        </h4>
        <div class="widget-main">
            @if(!$member['profile'])
                @include('component.login-form')
            @else
                <div>
                    {{$member['profile']['email']}}
                </div>
            @endif
        </div>
        <div class="widget-actions">
            @if(!$member['profile'])
                <div>
                    @if($member['actions']['registration'])
                        <a
                            href="{{$public['links']['registration']}}"
                            class="btn btn-outline-primary"
                        >
                            {{$t('common:btn.sign-in')}}
                        </a>
                    @endif
                    @if($member['actions']['lostPassword'])
                            <a
                                href="{{$public['links']['lostPassword']}}"
                                class="btn btn-outline-primary"
                            >
                                {{$t('common:btn.lost-password')}}
                            </a>
                    @endif
                </div>
            @else
                <div>
                    @if($member['actions']['profile_view'])
                        <a
                            href="{{$public['links']['profile']}}"
                            class="btn btn-outline-primary"
                        >
                            {{$t('common:btn.profile')}}
                        </a>
                    @endif
                    <member-logout-link
                        path="{{$public['links']['home']}}"
                    />
                </div>
            @endif
        </div>
    </div>
@endif
