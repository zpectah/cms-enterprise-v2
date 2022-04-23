@if($member['actions']['messages_create'])
    <div class="widget contact-form">
        <h4 class="title title--widget">
            {{$t('widget:contact-form.title')}}
        </h4>
        <div class="widget-main">
            @include('component.contact-form')
        </div>
    </div>
@endif