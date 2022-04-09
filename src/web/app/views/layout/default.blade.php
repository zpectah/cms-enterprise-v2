<div
        id="vue-app"
        class="page-app layout layout--default"
>
    @include('shared.header')
    <div>
        <demo-component>xxx</demo-component>
        <div>
            @include($page['template'])
        </div>
        @include('shared.sidebar')
    </div>
    @include('shared.footer')
</div>