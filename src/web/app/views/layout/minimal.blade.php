<div
        id="vue-app"
        class="page-app layout layout--minimal"
>
    <pre>
        <code>
            @php
                print_r($language);
                print_r($page);
                print_r($detail);
            @endphp
        </code>
    </pre>
    <div>
        @include($page['template'])
    </div>
    @include('shared.footer')
</div>