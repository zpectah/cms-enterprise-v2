@if($members['active'] && $members['members_login_active'])
    @php
        $formId = $d ?? 'FormLogin';
    @endphp
    <div class="widget widget-login">
        <h4 class="title title--widget">
            {{$t('widget:login.title')}}
        </h4>
        <div class="widget-main">
            <member-login-form>Loading</member-login-form>
        </div>
        <div class="widget-actions">
            <a href="{{$public['members_registration_link']}}">
                {{$t('common:btn.sign-in')}}
            </a>
            <a href="{{$public['members_lostPassword_link']}}">
                {{$t('common:btn.lost-password')}}
            </a>
        </div>
    </div>
@endif
