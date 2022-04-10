@php
    $menuType = $type ?? 'horizontal';
@endphp
<nav class="navigation navigation--{{$menuType}}">
    @include('component.menu')
</nav>