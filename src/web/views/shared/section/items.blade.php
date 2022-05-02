{{--
Section items list

* $sectionTitle
* $context
* $itemsList

--}}
<section class="section section--items">
    @include('shared.section.section-title', [ 'title' => isset($sectionTitle) ?? $sectionTitle ])
    @include('component.article-list', [
        'itemsList' => $itemsList,
    ])
</section>