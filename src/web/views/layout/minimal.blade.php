<div
    class="page-layout page-layout--minimal"
>
    <div class="page-layout-content">
        <div class="container">
            <div class="row">
                <div class="col">
                    @include($page['template'])
                </div>
            </div>
        </div>
    </div>
    @include('shared.footer')
    @include('shared.debugbar')
</div>