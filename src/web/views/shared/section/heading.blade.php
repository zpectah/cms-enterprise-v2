<section class="section section--heading">
    <h1 class="title title--page">
        {{$pageTitle}}
    </h1>
    @if($pageDescription)
        <section class="section">
            <p class="lead">
                {{$pageDescription}}
            </p>
        </section>
    @endif
    @if($pageMeta)
        <p class="text-muted">
            {{$pageMeta}}
        </p>
    @endif
</section>