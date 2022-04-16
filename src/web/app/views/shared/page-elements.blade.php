@foreach($page['page']['page']['page_elements'] as $element)
    <section
        class="section section--page-element"
    >
        @switch($element)

            @case('contact_form')
                @include('widget.widget-contact-form', [ 'formId' => 'PageContactForm' ])
            @break

            @case('subscribe_form')
                @include('widget.widget-subscription', [ 'formId' => 'PageSubscriptionForm' ])
            @break

        @endswitch
    </section>
@endforeach
