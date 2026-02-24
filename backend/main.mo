import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type Donation = {
    id : Nat;
    amount : Nat;
    name : ?Text;
    message : ?Text;
    timestamp : Int;
    donor : Principal;
  };

  module Donation {
    public func compareByAmount(a : Donation, b : Donation) : Order.Order {
      Nat.compare(a.amount, b.amount);
    };

    public func compareByTimestamp(a : Donation, b : Donation) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  var nextId = 0;
  var totalAmount = 0;
  var donationCount = 0;
  let donations = Map.empty<Nat, Donation>();

  public shared ({ caller }) func submitDonation(amount : Nat, name : ?Text, message : ?Text) : async () {
    if (amount == 0) { Runtime.trap("Donation amount must be greater than 0") };
    let donation : Donation = {
      id = nextId;
      amount;
      name;
      message;
      timestamp = Time.now();
      donor = caller;
    };
    donations.add(nextId, donation);
    nextId += 1;
    totalAmount += amount;
    donationCount += 1;
  };

  public query ({ caller }) func getTotalAmount() : async Nat {
    totalAmount;
  };

  public query ({ caller }) func getDonationCount() : async Nat {
    donationCount;
  };

  public query ({ caller }) func getRecentDonations(limit : Nat) : async [Donation] {
    let donationArray = donations.values().toArray();
    let sortedDonations = donationArray.sort(Donation.compareByTimestamp);

    let len = sortedDonations.size();
    if (limit >= len) {
      return sortedDonations;
    };

    let reversedDonations = sortedDonations.reverse();
    let slice = reversedDonations.sliceToArray(0, limit);

    slice.reverse();
  };

  public query ({ caller }) func getDonationsByAmount() : async [Donation] {
    donations.values().toArray().sort(Donation.compareByAmount);
  };

  public query ({ caller }) func getDonation(donationId : Nat) : async Donation {
    switch (donations.get(donationId)) {
      case (null) { Runtime.trap("Donation does not exist") };
      case (?donation) { donation };
    };
  };

  public query ({ caller }) func searchDonationsByDonor(donor : Principal) : async [Donation] {
    let results = List.empty<Donation>();
    for (donation in donations.values()) {
      if (donation.donor == donor) {
        results.add(donation);
      };
    };
    results.toArray();
  };

  public query ({ caller }) func searchDonationsByAmount(minAmount : Nat) : async [Donation] {
    let results = List.empty<Donation>();
    for (donation in donations.values()) {
      if (donation.amount >= minAmount) {
        results.add(donation);
      };
    };
    results.toArray();
  };
};
