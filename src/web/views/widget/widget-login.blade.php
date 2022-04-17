@if($members_options['active'] && $members_options['members_login_active'])
    <div class="widget widget-login">
        <h4 class="title title--widget">
            @if(!$member['profile'])
                {{$t('widget:login.title')}}
            @else
                {{$t('widget:profile.title')}}
            @endif
        </h4>
        <div class="widget-main">
            @if(!$member['profile'])
                <member-login-form form-id="{{$formId}}">Loading</member-login-form>
            @else
                <div>
                    {{$member['profile']['email']}}
                </div>
            @endif
        </div>
        <div class="widget-actions">
            @if(!$member['profile'])
                <div>
                    <a
                        href="{{$public['members_registration_link']}}"
                        class="btn btn-outline-primary"
                    >
                        {{$t('common:btn.sign-in')}}
                    </a>
                    <a
                        href="{{$public['members_lostPassword_link']}}"
                        class="btn btn-outline-primary"
                    >
                        {{$t('common:btn.lost-password')}}
                    </a>
                </div>
            @else
                <div>
                    <a
                        href="{{$public['members_profile_link']}}"
                        class="btn btn-outline-primary"
                    >
                        {{$t('common:btn.profile')}}
                    </a>
                    <member-logout-link
                        path="{{$public['home_link']}}"
                    />
                </div>
            @endif
        </div>
    </div>
@endif
