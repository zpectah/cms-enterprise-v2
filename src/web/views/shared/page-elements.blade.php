{{--
Page data elements
--}}
@if(isset($page['page']['page']['page_elements']))
    @foreach($page['page']['page']['page_elements'] as $element)
        @switch($element)

            @case('contact_form')
                @include('widget.widget-contact-form', [ 'formId' => 'PageContactForm' ])
            @break

            @case('subscribe_form')
                @include('widget.widget-subscription', [ 'formId' => 'PageSubscriptionForm' ])
            @break

            @case('company_card')
                @include('shared.company')
            @break

        @endswitch
    @endforeach
@endif
