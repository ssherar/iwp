(function($) {

	Number.prototype.clamp = function(min, max) {
		return (this < min ? min : (this > max ? max : this ));
	}

	Array.prototype.remove = function(ele) {
		var where;
		if((where = this.indexOf(ele)) > -1) {
			this.splice(where, 1);
		}
		return this;
	}
})(jQuery);
