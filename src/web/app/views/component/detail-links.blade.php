@if($detail['detail']['__links'])
    <section
            class="section section--links"
    >
    <pre>
        <code>
            @php
                print_r($detail['detail']['__links']);
            @endphp
        </code>
    </pre>
    </section>
@endif
