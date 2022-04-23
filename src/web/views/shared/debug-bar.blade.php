{{--
Debug bar
--}}
@if($public['web_mode_debug'])
    <div
        class="header-bar"
    >
        <div class="alert alert-warning m-0" role="alert">
            {{$t('debug:label')}}
        </div>
    </div>
@endif
