<div
    class="page-layout page-layout--minimal"
>
    <div class="container">
        <div class="row">
            <div class="col">
                @include($page['template'])
            </div>
        </div>
    </div>
    @include('shared.footer')
    @include('shared.debugbar')
</div>