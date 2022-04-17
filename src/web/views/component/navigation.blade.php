@php
    $menuType = $menuType ?? 'horizontal';
@endphp
<nav class="navigation navigation--{{$menuType}}">
    @include('component.menu')
</nav>