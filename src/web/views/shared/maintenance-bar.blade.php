{{--
Maintenance bar
--}}
@if($public['web_mode_maintenance'])
    <div
        class="header-bar"
    >
        <div class="alert alert-primary m-0" role="alert">
            {{$t('maintenance:label')}}
        </div>
    </div>
@endif