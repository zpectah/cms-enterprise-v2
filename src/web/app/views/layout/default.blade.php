<div
        id="vue-app"
        class="page-app layout layout--default"
>
    @include('shared.header')
    <div>
        <div>
            @include($view['template'])
        </div>
        @include('shared.sidebar')
    </div>
    @include('shared.footer')
</div>