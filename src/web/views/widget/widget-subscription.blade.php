@if($members_options['members_enabled'] && $members_options['members_register_active'])
    <div class="widget widget-subscription">
        <h4 class="title title--widget">
            {{$t('widget:subscription.title')}}
        </h4>
        <div class="widget-main">
            <member-subscription-form form-id="{{$formId}}">Loading</member-subscription-form>
        </div>
    </div>
@endif
