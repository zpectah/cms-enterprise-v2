@if($member['actions']['subscription'])
    <div class="widget subscription">
        <h4 class="title title--widget">
            {{$t('widget:subscription.title')}}
        </h4>
        <div class="widget-main">
            @include('component.subscription-form')
        </div>
    </div>
@endif
