<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewAdminController extends Controller
{
    public function index()
    {
        $reviews = Review::latest()->paginate(20);
        return view('admin.reviews.index', compact('reviews'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:100',
            'rating'  => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
            'is_approved' => 'nullable|boolean',
        ]);
        $validated['is_approved'] = $request->has('is_approved');
        Review::create($validated);
        return back()->with('success', 'Ulasan berhasil ditambahkan.');
    }

    public function update(Request $request, Review $review)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:100',
            'rating'  => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
            'is_approved' => 'nullable|boolean',
        ]);
        $validated['is_approved'] = $request->has('is_approved');
        $review->update($validated);
        return back()->with('success', 'Ulasan berhasil diupdate.');
    }

    public function toggle(Review $review)
    {
        $review->update(['is_approved' => !$review->is_approved]);
        return back()->with('success', 'Status review diubah.');
    }

    public function destroy(Review $review)
    {
        $review->delete();
        return back()->with('success', 'Review dihapus.');
    }
}
