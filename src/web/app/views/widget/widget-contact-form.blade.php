<div class="widget-contact-form">
    <h4 class="title title--widget">
        {{$t('widget:contact-form.title')}}
    </h4>
    <div class="widget-main">
        <contact-form
            email="{{$member['profile']['email']}}"
        >
            Loading
        </contact-form>
    </div>
</div>