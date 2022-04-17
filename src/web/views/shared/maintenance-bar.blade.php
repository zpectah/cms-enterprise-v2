@if($public['web_mode_maintenance'])
    <div
        class="header-bar"
    >
        {{$t('common:maintenance.label')}}
    </div>
@endif