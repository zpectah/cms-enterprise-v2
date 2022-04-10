@if($members['active'] && $members['members_register_active'])
    @php
        $formId = $d ?? 'FormSubscription';
    @endphp
    <div class="widget widget-subscription">
        <h4 class="title title--widget">
            {{$t('widget:subscription.title')}}
        </h4>
        <div class="widget-main">
            <member-subscription-form>Loading</member-subscription-form>
        </div>
    </div>
@endif
